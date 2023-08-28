import React, {useEffect} from 'react';
import { useSelector } from 'react-redux';
// import { UseSelector } from 'react-redux/es/hooks/useSelector';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { userSlice } from '@/store/reducers/UserSlice';
import { fetchUsers } from '@/store/reducers/ActionCreators';
import { userAPI } from '@/services/UserService';
import { IUser } from '@/models/IUser';

const RatingTable = () => {

  // UserService:
  const {data: users, error, isLoading} = userAPI.useFetchAllUsersQuery('');


  // UserSlice:
  // const dispatch = useAppDispatch();
  // const { users, isLoading, error} = useAppSelector((state) => state.userReducer);
  
  // useEffect(() => {
  //  dispatch(fetchUsers())
  // }, [])

  
  return (
    <>
    <div>
      {isLoading && <span>Loading...</span>}
      {/* {error && <span>{error}</span>} */}
      {JSON.stringify(users, null, 2)}
      
      </div>
     
    </>
  );
};

export default RatingTable;
