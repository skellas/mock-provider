import * as React from "react";
import { mount, ReactWrapper } from "enzyme";
import  gql from "graphql-tag";
import { act } from "react-dom/test-utils";
import { wait } from "@testing-library/react";

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

describe('App component',  () => {

  it('renders loading state', async () => {
    const wrapper = mount(<MockedProvider><App/></MockedProvider>);

    expect(wrapper.text()).toEqual("Loading store data...");
    await wait(() => {
      wrapper.update();
      expect(wrapper.text()).toContain("Error: $Network error:");
    });

  });

  it('renders after data retrieval', async () => {
    const wrapper = mount(
            <MockedProvider mocks={[MOCKED_CLIENT]} addTypename={false} >
              <App/>
            </MockedProvider>
    );

    await wait(() => {
      wrapper.update();
      expect(wrapper.find(".productName").length).toEqual(2);
    });

  });
  
  it('renders the same way using react test utils', async () => {
    let wrapper:ReactWrapper;
    
    act(() => {
      wrapper = mount(
        <MockedProvider mocks={[MOCKED_CLIENT]} addTypename={false} >
          <App/>
        </MockedProvider>
        );
    });

    await wait(() => {
      wrapper.update();
      expect(wrapper.find(".productName").length).toEqual(2);
    });
  });
})
