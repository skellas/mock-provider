import * as React from "react";
import { mount } from "enzyme";
import waitForExpect from "wait-for-expect";
import  gql from "graphql-tag";

import { MockedProvider } from "@apollo/react-testing";
import App from './App';

const MOCKED_CLIENT = {
    request: {
      query:  gql`
      {
        products(first:5) {
          id,
          name,
          description
        }
      }
      `
    },
    result: {
      data: {
        products: [
          {
            id: 1,
            name: "snare-boot",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          },
          {
            id: 2,
            name: "neptune-boot",
            description: "In metus risus, aliquam non massa tempus, gravida commodo orci."
          }
        ]
      }
    }
};

describe('App component', () => {

  it('renders loading state', () => {
    const wrapper = mount(<MockedProvider><App/></MockedProvider>);

    expect(wrapper.exists()).toEqual(true);
    expect(wrapper.text()).toEqual("Loading store data...");
  });

  it('renders after data retrieval', async () => {
    const wrapper = mount(
            <MockedProvider mocks={[MOCKED_CLIENT]} addTypename={false} >
              <App/>
            </MockedProvider>
    );

    await waitForExpect(() => {
      wrapper.update();
      expect(wrapper.find(".productName").length).toEqual(2);
    });
  });
})
