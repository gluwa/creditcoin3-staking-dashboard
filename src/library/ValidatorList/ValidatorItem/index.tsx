// Copyright 2023 @paritytech/polkadot-staking-dashboard authors & contributors
// SPDX-License-Identifier: GPL-3.0-only

import React from 'react';
import { Default } from './Default';
import { Nomination } from './Nomination';
import type { ValidatorItemProps } from './types';

export const ValidatorItemInner = (props: ValidatorItemProps) => {
  const { format } = props;

  return format === 'nomination' ? (
    <Nomination {...props} />
  ) : (
    <Default {...props} />
  );
};

export class ValidatorItem extends React.Component<ValidatorItemProps> {
  shouldComponentUpdate(nextProps: ValidatorItemProps) {
    return (
      this.props.validator.address !== nextProps.validator.address ||
      this.props.validator.totalStake !== nextProps.validator.totalStake
    );
  }

  render() {
    return <ValidatorItemInner {...this.props} />;
  }
}
