import { UserProfile } from "@/components/UserProfile";


export default function UserProfilePage() {
  const dummyUser = {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "123-456-7890",
    location: "New York, USA",
    joinDate: "2023-01-15",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
  };

  return (
    <div>
      <UserProfile onBack={() => { }} onUpdateProfile={() => { }} userProfile={dummyUser} />
    </div>
  );
}
