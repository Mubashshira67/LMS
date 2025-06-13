function StudentLogout() {

  localStorage.removeItem('studentLoginStatus');
  console.log('studentLoginStatus');
  window.location.href = '/user-login';

  return <div></div>;
}
export default StudentLogout;
