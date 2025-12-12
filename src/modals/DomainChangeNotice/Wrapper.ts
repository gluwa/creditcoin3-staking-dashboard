// Copyright 2023 @paritytech/polkadot-staking-dashboard authors & contributors
// SPDX-License-Identifier: GPL-3.0-only

import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

export const CloseButton = styled.button`
  width: 20px;
  height: 20px;
  display: block;
  align-self: flex-end;
  margin-bottom: 20px;
  padding: 0;
  background: none;
  border: none;
  cursor: pointer;
  transition: opacity 0.2s ease;
  position: relative;

  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 15px;
    height: 1px;
    background-color: #0c0e10;
    border-radius: 4px;
  }

  &::before {
    transform: translate(-50%, -50%) rotate(45deg);
  }

  &::after {
    transform: translate(-50%, -50%) rotate(-45deg);
  }
`;

export const NoticeTitle = styled.h2`
  color: #0c0e10 !important;
  text-align: center;
  margin: 0 !important;

  /* title3-bold */
  font-family: Inter-SB;
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%;
`;

export const Notice = styled.div`
  margin-top: 8px;
  margin-bottom: 32px;
  text-align: center;

  p {
    color: #4c4e50;
    font-family: var(--family-body, Inter-R);
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    line-height: 150%;
    letter-spacing: -0.15px;
    margin: 0;

    strong {
      font-weight: 600;
    }
  }

  a {
    color: #4c4e50 !important;
    text-decoration-line: underline;
    transition: color 0.2s ease;
  }
`;

export const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  user-select: none;
  margin-bottom: 20px;
`;

export const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
`;

export const StyledCheckbox = styled.div<{ checked: boolean }>`
  width: 24px;
  height: 24px;
  border: 1px solid #dadcdd;
  border-radius: 4px;
  position: relative;
  flex-shrink: 0;
  overflow: hidden;

  ${({ checked }) =>
    checked &&
    `
    border-color: #18c792;
    background-color: #18c792;
  `}
`;

export const CheckMask = styled.div<{ checked: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

export const CheckIcon = styled.svg<{ checked: boolean }>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 13px;
  height: 9px;
  z-index: 1;

  path {
    stroke: #fff;
    stroke-width: 1.77778;
    stroke-linecap: round;
    stroke-linejoin: round;
    fill: none;
    stroke-dasharray: 18;
    stroke-dashoffset: ${({ checked }) => (checked ? '0' : '18')};
  }
`;

export const CheckboxText = styled.span`
  overflow: hidden;
  color: #4c4e50;
  text-overflow: ellipsis;

  /* label6-regular */
  font-family: Inter-R;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
  letter-spacing: -0.13px;
`;

export const SubmitButton = styled.button`
  background-color: #18c792;
  align-self: stretch;
  height: 52px;
  padding: 0 24px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  color: #fff;
  text-align: center;
  font-family: Inter-R;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%;
  letter-spacing: -0.16px;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.9;
  }

  &:active {
    opacity: 0.8;
  }
`;
