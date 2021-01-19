
**This web application will analyze existing US Congressional districting plans for evidence of racial and/or ethnic bias.**
The analysis is performed by generating a large number of random congressional districts for the state, and comparing the existing districting plans with the distribution of random plans. The analysis looks for evidence of "packing," in which racial and/or ethnic groups are packed into a small number of districts so as to reduce their overall influence on congressional representation in the state.

*The term **districting** used in the project statements refers to a partition of the state into 'n' contiguous districts, where 'n' is the number of allocated congressional seats following the 2010 census.*

**Central to the project is the representation of voting precincts in a state as a connected graph; the nodes represent the voting precincts and the edges denote precinct geographic adjacency. The Python algorithm uses this approach to generate new districtings.**


#### Home Page
![Screen Shot 2020-12-15 at 7 54 09 PM](https://user-images.githubusercontent.com/56279592/103239389-57bed180-491b-11eb-80ac-b59033e0ebb0.png)

#### View Current Enacted Districts and Precincts
![Screen Shot 2020-12-15 at 7 56 06 PM](https://user-images.githubusercontent.com/56279592/103250083-39b79800-4940-11eb-91ef-dfabc133c947.png)

#### Enable Heat Map based on selected Minority Population
![Screen Shot 2020-12-15 at 7 56 32 PM](https://user-images.githubusercontent.com/56279592/103250230-e85bd880-4940-11eb-8a9e-a38abaa1d98c.png)

#### View Newly Generated Districting Plan
![Screen Shot 2020-12-15 at 8 07 34 PM](https://user-images.githubusercontent.com/56279592/103250238-eeea5000-4940-11eb-89c8-eb2ce65e2d83.png)

#### Boxplot Analysis between Enacted and Generated Plan
![Screen Shot 2020-12-15 at 8 06 49 PM](https://user-images.githubusercontent.com/56279592/103250243-f4479a80-4940-11eb-908a-eeb04b1f13db.png)

## Redistricting Algorithm Implementation 
![Activity Diagram - Algorithm-1](https://user-images.githubusercontent.com/56279592/103250592-9caa2e80-4942-11eb-8f9a-964c59016b91.png)
