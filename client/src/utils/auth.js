import decode from 'jwt-decode';

class AuthService {
  getUserToken() {
    return decode(this.getToken());
  }

  loggedIn() {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token); 
  }

  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      } else return false;
    } catch (err) {
      return false;
    }
  }

  getToken() {
    return localStorage.getItem('jwtToken');
  }

  login(idToken) {
    localStorage.setItem('jwtToken', idToken);

    window.location.assign('/dashboard');
  }

  logout() {
    localStorage.removeItem('jwtToken');
    window.location.assign('/');
  }
}

export default new AuthService();