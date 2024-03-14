import React, { useEffect, useState } from 'react';

const GetUsers = () => {
    const [users, setUsers] = useState([]);
    const { error, loading, data } = useQuery(LOAD_USERS);
    const Users = () => {
        return users.map((item, i) => {
            return <p key={i}>{item.first_name}</p>;
        });
    };
    useEffect(() => {
        Users();
        if (data) {
            setUsers(data.getAllUsers);
        }
    }, [data]);
    return <div>{Users()}</div>;
};

export default GetUsers;
