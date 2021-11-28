const serializeWallet = wallet => ({
  id: wallet.id,
  address: wallet.address,
  private_key: wallet.privateKey,
});

module.exports = data => {
  if (!data) {
    throw new Error("Expect data to be not undefined nor null");
  }

  if (Array.isArray(data)) {
    return data.map(serializeWallet);
  }
  return serializeWallet(data);
};
