import React from 'react';
import styled from 'styled-components';

function Navbar() {

    return (
        <>
        <Wrapper>
            <p>Home</p>
            <p>About</p>
            <p>Menu</p>
            <p>Contact Us</p>
        </Wrapper>
        </>
    );
};

const Wrapper = styled.div`

`

export default Navbar;