import React from 'react';
import { Query } from "react-apollo";
import  gql from "graphql-tag";

import './App.css';

const FIND_FIRST_FIVE_PRODUCTS = gql`
{
  products(first:5) {
      id,
      name,
      description
  }
}
`;

class FindProductsResponse {
 products: Array<Product>;
 constructor(products: Array<Product>) {
  this.products = products;
 }
}
class Product {
  id: number;
  name: String;
  description: String;
  constructor(id: number, name: String, description: String) {
    this.id = id;
    this.name = name;
    this.description = description;
  }
}

const App: React.FC = () => {
  return (
    <div className="App">
      <Query<FindProductsResponse,{}> query={FIND_FIRST_FIVE_PRODUCTS}>
        {({loading, error, data}) => {
          if (loading) return (<p>Loading store data...</p>);
          if (error) return (<p>Error: ${error.message}</p>);
          return (
            <div id="productList" className="container">
              {data && data.products.map( product => (
                <div className="product" key={product.id}>
                  <h2 className="productName">{product.name}</h2>
                  <p>{product.description}</p>
                </div>
              ))}
            </div>
          )
        }}
      </Query>
    </div>
  );
}

export default App;
