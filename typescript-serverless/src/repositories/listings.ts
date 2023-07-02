import PostgresClient from "serverless-postgres";
import { Listing, ListingWrite } from "@/types.generated";
import { extractVariables } from "@/libs/postgres";
import { EntityNotFound } from "@/libs/errors";

type ListingTableRow = {
  id?: number;
  created_date: Date;
  updated_date: Date;
  name: string;
  description: string;
  building_type: Listing["building_type"];
  surface_area_m2: number;
  rooms_count: number;
  bedrooms_count: number;
  contact_phone_number: string;
  price: number;
  street_address: string;
  postal_code: string;
  city: string;
  country: string;
  price_history?:boolean;

};

type PriceHistory = {
  price_eur: number;
  created_date: string;
};

function tableRowToListing(row: ListingTableRow): Listing {
  return {
    id: row.id,
    description: row.description,
    name: row.name,
    surface_area_m2: row.surface_area_m2,
    contact_phone_number: row.contact_phone_number,
    building_type: row.building_type,
    rooms_count: row.rooms_count,
    bedrooms_count: row.bedrooms_count,
    latest_price_eur: row.price,
    postal_address: {
      street_address: row.street_address,
      postal_code: row.postal_code,
      city: row.city,
      country: row.country,
    },
    created_date: row.created_date.toISOString(),
    updated_date: row.updated_date.toISOString(),
    price_history:row.price_history

  };
}

function listingToTableRow(
  listing: ListingWrite,
  createdDate: Date
): ListingTableRow {
  return {
    description: listing.description,
    name: listing.name,
    surface_area_m2: listing.surface_area_m2,
    contact_phone_number: listing.contact_phone_number,
    building_type: listing.building_type,
    rooms_count: listing.rooms_count,
    bedrooms_count: listing.bedrooms_count,
    price: listing.latest_price_eur,
    street_address: listing.postal_address.street_address,
    postal_code: listing.postal_address.postal_code,
    city: listing.postal_address.city,
    country: listing.postal_address.country,
    created_date: createdDate,
    updated_date: new Date(),

  };
}

export function getRepository(postgres: PostgresClient) {
  return {
    async getAllListings(): Promise<Listing[]> {
      const queryString = `
      SELECT
        listing.*,
        CASE WHEN price_history.listing_id IS NULL THEN false ELSE true END AS price_history
      FROM listing
      LEFT JOIN price_history ON price_history.listing_id = listing.id
      ORDER BY listing.id DESC;
    `;
          const result = await postgres.query(queryString);

      return result.rows.map(tableRowToListing);
    },

    async getListing(listingId: number) {
      const queryString = `SELECT * FROM listing WHERE id = $1`;
      const queryValues = [listingId];

      const result = await postgres.query(queryString, queryValues);
      const listing = result.rows[0];

      if (!listing) {
        throw new EntityNotFound(`Could not find listing with id: ${listingId}`);
      }

      return tableRowToListing(listing);
    },

    async insertListing(listing: ListingWrite) {
      const tableRow = listingToTableRow(listing, new Date());

      const {
        columns,
        variables,
        values: queryValues,
      } = extractVariables(tableRow);

      const queryString = `
        INSERT INTO listing (${columns.join(",")})
        VALUES(${variables})
        RETURNING *
      `;
      const result = await postgres.query(queryString, queryValues);

      const insertedListing = tableRowToListing(result.rows[0]);

      return insertedListing;
    },

    async updateListing(listingId: number, listing: ListingWrite) {
      const originalListing = await this.getListing(listingId);

      const tableRow = listingToTableRow(listing, originalListing.created_date);
      const { columns, columnsVariables, values } = extractVariables(tableRow);

      const queryString = `
        UPDATE listing
          SET ${columnsVariables.join(", ")}
          WHERE id = $${columns.length + 1}
        RETURNING *
      `;
      const queryValues = [...values, listingId];
      const result = await postgres.query(queryString, queryValues);

      const updatedListing = tableRowToListing(result.rows[0]);

      // Store price history if the price has changed
      if (updatedListing.latest_price_eur !== originalListing.latest_price_eur) {
        await this.insertPriceHistory(updatedListing.id, updatedListing.latest_price_eur, updatedListing.updated_date);
      }

      return updatedListing;
    },

    async insertPriceHistory(listingId: number, price: number, date: string) {
      const queryString = `
        INSERT INTO price_history (listing_id, price_eur, created_date)
        VALUES ($1, $2, $3)
      `;
      const queryValues = [listingId, price, date];

      await postgres.query(queryString, queryValues);
      console.log(`Storing price history for listing ${listingId}: Price: ${price}, Date: ${date}`);
    },

    async getPriceHistory(listingId: number)   {
      
      const queryString = `
      SELECT price_eur, created_date
      FROM price_history
      WHERE listing_id = $1
      ORDER BY created_date ASC
    `;
  
    const queryValues = [listingId];
  
    const result = await postgres.query(queryString, queryValues);
    return result.rows;
    },
  };
}
