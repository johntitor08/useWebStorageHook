import { useWebStorage } from "./useWebStorage";

function MultiTabLogin() {
  const [user, setUser, removeUser] = useWebStorage("user", null, "local");

  const login = () => setUser({ name: "John Titor", session: "active" });
  const logout = () => removeUser();

  return (
    <div style={{ padding: "20px" }}>
      {user ? (
        <>
          <h2>Hoş geldin {user.name} 👋</h2>
          <button onClick={logout}>Çıkış yap</button>
          <p>(Başka sekmede çıkış yaparsan burası da güncellenir)</p>
        </>
      ) : (
        <>
          <h2>Giriş yapmadın.</h2>
          <button onClick={login}>Giriş yap</button>
        </>
      )}
    </div>
  );
}

export default MultiTabLogin;
