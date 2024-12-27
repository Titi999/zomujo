// import PatientHome from '@/app/dashboard/_components/patientHome/home';

export default function Dashboard() {
  const date = new Date();
  return (
    <div>
      {date.toISOString()}
      {/*<PatientHome />*/}
    </div>
  );
}
