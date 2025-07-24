import LogoutButton from '../components/LogoutButton';

const DashboardPage = () => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Welcome to your dashboard</h2>
      <LogoutButton />
      {/* Other dashboard content */}
    </div>
  );
};

export default DashboardPage;
