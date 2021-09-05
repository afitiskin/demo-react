import { CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React, { FC, memo } from 'react';
import PropTypes from 'prop-types';

const DEFAULT_SIZE = 25;

interface IProps {
  size?: number;
}

const useStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const Loader: FC<IProps> = memo(({ size }: IProps): JSX.Element => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CircularProgress size={size} />
    </div>
  );
});

Loader.propTypes = {
  size: PropTypes.number,
};

Loader.defaultProps = {
  size: DEFAULT_SIZE,
};

export default Loader;