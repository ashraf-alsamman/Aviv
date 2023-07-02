import { functionHandler } from "@/libs/function";
import { getRepository } from "@/repositories/listings";
import { Price } from "@/types.generated";
import { EntityNotFound, NotFound } from "@/libs/errors";

export const getListingPrices = functionHandler(async (event, context) => {
  try {
    const listing = await getRepository(context.postgres).getPriceHistory(
      parseInt(event.pathParameters.id)
    );
    return { statusCode: 200, response: listing };
  } catch (e) {
    if (e instanceof EntityNotFound) {
      throw new NotFound(e.message);
    }
    throw e;
  }
});
