(async () => {
  try {
    const loginRes = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'test_user_ps@example.com', password: 'Password123!' })
    });

    const loginData = await loginRes.json();
    console.log('LOGIN_RESPONSE', JSON.stringify(loginData));

    const token = loginData.token;
    if (!token) {
      console.error('No token returned');
      process.exit(1);
    }

    const protectedRes = await fetch('http://localhost:5000/api/protected', {
      headers: { Authorization: 'Bearer ' + token }
    });

    const protectedData = await protectedRes.json();
    console.log('PROTECTED_RESPONSE', JSON.stringify(protectedData));
  } catch (err) {
    console.error('ERROR', err);
  }
})();
