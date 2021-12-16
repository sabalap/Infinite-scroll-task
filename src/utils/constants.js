export const url = `http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/`;
export const friendsUrl = (id,pageNumber) => {
    return `http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${id}/friends/${pageNumber}/20`;
}