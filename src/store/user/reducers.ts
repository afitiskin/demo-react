import { createReducer, PayloadAction } from '@reduxjs/toolkit';
import { Reducer } from 'redux';
import { IMessage } from '../../model/message.interface';
import { IUser } from '../../model/user.interface';
import {
  userClear,
  userFailure,
  userRequest,
  userSet,
  userSetMessages,
  userSuccess,
} from './actions';
import { IUserState } from './types';

const initialState: IUserState = {
  isLoading: false,
  data: null,
  messages: [],
  error: null,
};

export const userReducer: Reducer<IUserState> = createReducer(initialState, {
  [userRequest.type]: (state: IUserState): IUserState => ({
    ...state,
    isLoading: true,
  }),
  [userSet.type]: (state: IUserState, action: PayloadAction<IUser>): IUserState => ({
    ...state,
    data: action.payload,
  }),
  [userSuccess.type]: (state: IUserState): IUserState => ({
    ...state,
    isLoading: false,
  }),
  [userFailure.type]: (state: IUserState, action: PayloadAction<Error>): IUserState => ({
    ...state,
    isLoading: false,
    error: action.payload,
  }),
  [userClear.type]: (): IUserState => initialState,
  [userSetMessages.type]: (state: IUserState, action: PayloadAction<IMessage[]>): IUserState => ({
    ...state,
    messages: action.payload,
  }),
});
