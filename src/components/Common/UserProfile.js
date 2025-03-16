import { useAuth } from '../Auth/AuthContext';
import md5 from 'md5';
import styled from "styled-components";

const UserProfile = () => {
    const { user } = useAuth();

    const getGravatarUrl = (size = 100) => {
        const emailHash = md5(user.email.trim().toLowerCase());
        return `https://www.gravatar.com/avatar/${emailHash}?s=${size}`;
    }

    return (
        <UserProfileWrapper src={getGravatarUrl()} alt='User Avatar' />
    );
}

export default UserProfile;

const UserProfileWrapper = styled.img`
    border-radius: 50%;
`;