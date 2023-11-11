import decode from 'jwt-decode';

class AuthService {
  getUserToken() {
    return decode(this.getToken());
  }

  loggedIn() {
    const token = this.getToken();
    return token && !this.isTokenExpired(token) ? true : false;
  }

  isTokenExpired(token) {
    const decoded = decode(token);
    if (decoded.exp < Date.now() / 1000) {
      localStorage.removeItem('id_token');
      return true;
    }
    return false;
  }

  getToken() {
    return localStorage.getItem('id_token');
  }

  login(idToken, onNavigate) {
    localStorage.setItem('id_token', idToken);
    // delay navigation
    setTimeout(() => {
      if (typeof onNavigate === 'function') {
        onNavigate('/dashboard');
      }
    }, 5000)
    
  }

  logout() {
    localStorage.removeItem('id_token');
    window.location.assign('/');
  }
}
// eslint-disable-next-line
export default new AuthService();