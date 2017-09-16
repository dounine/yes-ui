import React from 'react';
import Resource from '../request/request-options-body-resources';
import renderer from 'react-test-renderer';
import {shallow} from 'enzyme';

test('Link changes the class when hovered', () => {
    let resourceButton = false
    var resourceClose = () =>{

    }
    const component = renderer.create(
        <Resource resourceClose={resourceClose} resourceButton={true} />
    );
    // const aa = shallow(
    //     <Resource resourceClose={resourceClose} resourceButton={true} />
    // );
    // expect(aa).toMatchSnapshot()
    component.toJSON().props.openDialog()
    expect(component.toJSON()).toMatchSnapshot()

    // expect(component.toJSON()).toMatchSnapshot()

});