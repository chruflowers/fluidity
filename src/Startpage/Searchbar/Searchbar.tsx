import React from 'react';
import styled from "@emotion/styled";
import * as Settings from "../Settings/settingsHandler";

import google from "../../data/pictures/google.svg";
import duckduckgo from "../../data/pictures/duckduckgo.svg";
import qwant from "../../data/pictures/qwant.svg";

const StyledSearchbarContainer = styled.div`
    position: fixed;
    left: 100px;
    right: 50px;
    bottom: 40px;
    height:min-content;
    `;
const StyledSearchbar = styled.input`
    width: 100%;
    font-size: 30pt;
    
    background-color: rgba(0,0,0,0);
    color: var(--default-color);
    transition: .3s;
    border: none;
    border-bottom: 2px solid var(--default-color);
    opacity: 0.3;
    
    ::placeholder {
        color: var(--default-color);
    }
    
    :hover, :focus {
        opacity: 1;
        outline: none;
    }
`;

const SearchIcon = styled.div<{ src: string }>`
    position: fixed;
    left: 35px;
    bottom: 40px;
    height: 2.9rem;
    width: 2.9rem;

    background: var(--default-color);
    
    -webkit-mask-size: cover;
    mask-size: cover;
    -webkit-mask-image: url(${({ src }) => src});
    mask-image: url(${({ src }) => src});
`;

export const Searchbar = () => {
    let engine: string = Settings.Search.get()?.engine || "duckduckgo.com/";

    let searchSymbol = duckduckgo
    if (engine.startsWith("google"))
        searchSymbol = google;
    else if (engine.startsWith("qwant"))
        searchSymbol = qwant;

    const redirectToSearch = (query: string) => {
        window.location.href = "https://" + engine + "?q=" + query;
    }

    return (
        <StyledSearchbarContainer>
            <StyledSearchbar
                placeholder="Always stay clean!"
                type="input"
                onKeyUp={e => e.which === 13 && redirectToSearch(e.currentTarget.value)}
                autoFocus={true}
            />
            <SearchIcon src={searchSymbol} />
        </StyledSearchbarContainer>
    );
}
