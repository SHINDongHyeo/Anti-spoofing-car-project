import React from 'react';
import { StyledButton } from '../../src/components/CustomStyled';
import UserLoginForm from './UserLoginForm';

const index = () => {
    return (
        <div>
            <UserLoginForm/>
            <StyledButton>버튼</StyledButton>
        </div>
    );
};

export default index;