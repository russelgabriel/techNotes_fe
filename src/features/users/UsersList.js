import { useGetUsersQuery } from './usersApiSlice'
import User from './User'

const UsersList = () => {
  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetUsersQuery(null, {
    pollingInterval: 60000, // refetch data every 60 seconds
    refetchOnFocus: true,  // refetch data when window regains focus
    refetchOnMountOrArgChange: true // refetch data when component mounts or when args change
  })

  let content

  if (isLoading) content = <p>Loading...</p>

  if (isError) {
    content = <p className='errmsg'>{error?.data?.message}</p>
  }

  if (isSuccess) {

    const { ids } = users

    const tableContent = ids?.length
      ? ids.map(userId => <User key={userId} userId={userId}/>)
      : null

    content = (
      <table className='table table--users'>
        <thead className='table__head'>
          <tr>
            <th scope='col' className='table__th user_username'>Username</th>
            <th scope='col' className='table__th user_roles'>Roles</th>
            <th scope='col' className='table__th user_edit'>Edit</th>
          </tr>
        </thead>
        <tbody>
          {tableContent}
        </tbody>
      </table>
    )
  }

  return content
}

export default UsersList