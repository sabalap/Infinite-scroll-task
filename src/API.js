export const getUsers = async page => {
    const users = await (
        await fetch(`http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${page}/20`)
    ).json();
    return users.list;
}