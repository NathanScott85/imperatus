import React from 'react';
import { SearchIcon } from '../svg';
import { styled } from '@mui/material';

export const Search = () => { 
    const [search, setSearch] = React.useState('');
    
    const onChange = (e: any) => {
        setSearch(e.target.value);
    };

    return(
    <SearchContainer>
        {/* <UsingTheme>Using Theme</UsingTheme> See comments below */}
        <Input type="text" onChange={onChange} placeholder={search ? '' : "Search"} />
        <SearchButton>
            <SearchIcon />
        </SearchButton>
    </SearchContainer>
);
}

const SearchContainer = styled('div')`  
    display: flex;
    flex-direction: row;
    align-items: center;
    color: #D4B05F;
    margin: 0 3.5rem;
    padding: 1.2rem 0.75rem 1.2rem 0.75rem;
`;

export const Input = styled('input')`
border: 1px solid rgba(172, 143, 255, 0.50);
    border-right: none;
    background: transparent;
    color: white;
    font-family: Barlow;
    font-size: 1rem; 
    font-weight: 400;
    line-height: 14px;
    letter-spacing: 0em;
    width: 618px;
    height: 35px;
    text-align: left;
    height: 35px;
    line-height: 1.5rem;
    caret-color: white;
    padding: 0.75rem 0.75rem 0.75rem 0;
    margin: 0 0.5rem;
    ::placeholder {
        color: #D3D3D3 !important;
        margin-left: 0.1rem;
        font-size: 1rem;
        color: #FFF;
        font-family: Barlow;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
    }
    text-indent:20px;
    input:focus::placeholder {
        color: transparent;
    }
    input:active::placeholder {
        color: transparent;
    }
    &:focus {
        outline: none;
    }
`;

export const SearchButton = styled('button')`
    border: 1px solid #AC8FFF80;
    border-left: none;
    background: transparent;
    color: #FFF;
    font-size: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 500;
    line-height: 1.5rem;
    height: 35px;
    padding: 1rem 1.25rem 1.15rem 0.25rem;
    margin: -0.5rem;
    &:focus {
        outline: none;
    }
`;

// const UsingTheme = styled('a')<{ thing: any}>(
//     ({ theme }) => { 
//         console.log(theme);
//         return ({
//             [theme.breakpoints.down('md')]: {
//                 color: theme.palette.primary.light,
//               },
//       backgroundColor: theme.palette.primary.light,
//       color: theme.palette.primary.main,
//       padding: theme.spacing(2),
//       textAlign: 'center',
//       ...theme.typography.h6,
    
//     })},
//   )

// const TestingProps = styled(Box, {

//     // Configure which props should be forwarded on DOM
//    shouldForwardProp: (prop) => prop !== 'dark' && prop!== 'border'
 
//    })<{ dark: any}>
 
//    (({ dark, border, theme }) => ({
 
//    backgroundColor: dark? theme.palette.grey[900] : theme.palette.grey[100],
//    color: dark? theme.palette.grey[100] : theme.palette.grey[900],
//    border: border? `1rem solid ${theme.palette.primary.main}` : 'none'
 
// }));