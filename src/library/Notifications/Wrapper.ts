// Copyright 2023 @paritytech/polkadot-staking-dashboard authors & contributors
// SPDX-License-Identifier: GPL-3.0-only

import styled from 'styled-components';

export const Wrapper = styled.ul`
  position: fixed;
  bottom: 10px;
  right: 0;
  display: flex;
  flex-direction: column;
  list-style: none;
  justify-content: flex-end;
  z-index: 10;

  li {
    background: var(--background-primary);
    margin: 0.3rem 1.2rem;
    position: relative;
    border-radius: 1.25rem;
    padding: 1rem 1.35rem;
    display: flex;
    flex-flow: column wrap;
    justify-content: center;
    cursor: pointer;
    width: 375px;
    box-shadow: 0 1.75px 0 1.25px rgba(0, 0, 0, 0.1);

    h3 {
      color: var(--accent-color-primary);
      font-family: SF-Pro-M, InterSemiBold, sans-serif;
      font-size: 1.2rem;
      margin: 0.15rem 0 0.4rem;
      flex: 1;
    }
    h4 {
      font-family: SF-Pro-M, InterSemiBold, sans-serif;
      font-size: 0.94rem;
      line-height: 1.45rem;
    }
  }
`;
