const KEY = "kripto_auth_user";

/**
 * Kullanıcıyı getir
 */
export function getUser() {
  const u = localStorage.getItem(KEY);
  return u ? JSON.parse(u) : null;
}

export function isLoggedIn() {
  return !!getUser();
}

/**
 * Giriş
 */
export function login(email, password) {
  const users = getUsers();

  const user = users.find(
    (u) => u.email === email && u.password === password
  );

  if (!user) return false;

  localStorage.setItem(KEY, JSON.stringify({ email: user.email }));
  return true;
}

/**
 * Kayıt
 */
export function register(email, password) {
  const users = getUsers();

  const exists = users.find((u) => u.email === email);
  if (exists) return false;

  users.push({ email, password });
  localStorage.setItem("kripto_users", JSON.stringify(users));

  // otomatik giriş
  localStorage.setItem(KEY, JSON.stringify({ email }));
  return true;
}

/**
 * Çıkış
 */
export function logout() {
  localStorage.removeItem(KEY);
}

/**
 * Local kullanıcı listesi
 */
function getUsers() {
  const u = localStorage.getItem("kripto_users");
  if (!u) {
    // demo kullanıcı
    const demo = [{ email: "admin@kripto.com", password: "123456" }];
    localStorage.setItem("kripto_users", JSON.stringify(demo));
    return demo;
  }
  return JSON.parse(u);
}
