const serializeDeposit = deposit => ({
  id: deposit.id,
  sender_address: deposit.senderAddress,
  amount_sent: deposit.amountSent,
  tx_hash: deposit.txHash,
  created_at: deposit.createdAt
});

module.exports = data => {
  if (!data) {
    throw new Error("Expect data to be not undefined nor null");
  }

  if (Array.isArray(data)) {
    return data.map(serializeDeposit);
  }
  return serializeDeposit(data);
};
