import db from "@/utils/db";

const AboutPage = async () => {
  
  const profile = await db.testProfile.create({
    data: {
      name: "random name",
    },
  });

  const users = await db.testProfile.findMany();

  return (
    <div>
      {users.map((user) => {
        return (<p key={user.id}>{user.name}</p>)
      })}
    </div>
  );
};

export default AboutPage;
