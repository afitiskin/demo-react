import { Grid } from '@material-ui/core';
import React, { FC, memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useParams } from 'react-router-dom';
import { Dispatch } from 'redux';
import Loader from '../../common/Loader';
import PageWrapper from '../../common/PageWrapper';
import { IUser } from '../../model/user.interface';
import { RootState } from '../../store/types';
import { fetchUser, userClear } from '../../store/user/actions';
import { getUser, getUserError, getUserLoading } from '../../store/user/selectors';
import UserInfo from './components/UserInfo';
import UserMessages from './components/UserMessages';

interface IParams {
  id: string;
}

const User: FC = memo(() => {
  const { id } = useParams<IParams>();

  const isLoading = useSelector<RootState, boolean>(getUserLoading);
  const user = useSelector<RootState, IUser | null>(getUser);
  const error = useSelector<RootState, Error | null>(getUserError);
  const dispatch: Dispatch<RootState> = useDispatch<RootState>();

  useEffect(
    () => () => {
      dispatch(userClear());
    },
    []
  );

  useEffect(() => {
    dispatch(fetchUser(+id));
  }, [dispatch, id]);

  return (
    <PageWrapper>
      {isLoading && <Loader size={48} />}

      {user && (
        <Grid container spacing={2}>
          <Grid item xs={3} sx={{ marginTop: 2 }}>
            <UserInfo user={user} />
          </Grid>

          <Grid item xs={9}>
            <UserMessages user={user} />
          </Grid>
        </Grid>
      )}

      {error && <Redirect to="/404" />}
    </PageWrapper>
  );
});

export default User;
