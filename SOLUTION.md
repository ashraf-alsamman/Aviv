# AVIV technical test solution

You can use this file to write down your assumptions and list the missing features or technical revamp that should
be achieved with your implementation.

## Notes

Write here notes about your implementation choices and assumptions.

## Questions

This section contains additional questions your expected to answer before the debrief interview.

- **What is missing with your implementation to go to production?**
    Automated deployment and CI/CD pipeline.
    Horizontal scalability and elasticity for handling increased traffic.
    Comprehensive monitoring and logging for performance and issue identification.
    Robust error handling and resilience mechanisms.
    Strong security measures, including input validation, authentication, and data protection.

- **How would you deploy your implementation?**
    Set up a cloud hosting environment (e.g., AWS, Azure) for both frontend and backend.
    Utilize a CI/CD pipeline (e.g., using tools like Jenkins, GitLab CI) for automated deployment.
    Configure the deployment process to deploy the frontend build to a content delivery network (CDN) and deploy the serverless backend functions to their respective cloud provider.

- **If you had to implement the same application from scratch, what would you do differently?**
   
   Backend:
   Remake a database design and choosing an architecture suitable for the work requirements.
   Add testing

   Froneend:
   Add Nextjs to frontend.
   Add validation module
   Add testing

- **The application aims at storing hundreds of thousands listings and millions of prices, and be accessed by millions
  of users every month. What should be anticipated and done to handle it?**

    Scalable Database Design: Implement a robust and scalable database design to handle the large volume of data. Utilize techniques     such as data partitioning and     indexing to optimize query performance and ensure efficient data retrieval.

    Robust Hosting Infrastructure: Set up a powerful hosting infrastructure capable of handling high user traffic. Consider leveraging     cloud services like Amazon     Web Services (AWS) or Microsoft Azure to provide the necessary scalability and flexibility.

    Performance Optimization: Implement performance optimization techniques such as caching, pre-aggregation, and efficient content delivery mechanisms. Additionally,     employ data compression techniques to reduce data size and improve transfer speeds.

    Efficient Responsiveness: Enhance application responsiveness by optimizing the user interface and employing responsive design principles. Utilize server-side and     client-side techniques to improve overall performance.

    Load and Performance Testing: Conduct thorough load and performance testing to ensure the application can handle the anticipated user load and data volume. Tools     like Apache JMeter or Gatling can be used to assess application performance under high load conditions.

    Distribution and Redundancy: Distribute the workload across multiple servers to achieve load balancing and ensure application sustainability in case of server     failures. Utilize distributed load balancing techniques to achieve this goal.

    Security and Protection: Implement appropriate security measures to safeguard the application and the stored data. This includes encryption, reliable     authentication, identity verification, and continuous monitoring for malicious activities.


  NB : You can update the [given architecture schema](./schemas/Aviv_Technical_Test_Architecture.drawio) by importing it
  on [diagrams.net](https://app.diagrams.net/) 
