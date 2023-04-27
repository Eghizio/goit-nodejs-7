const reportResult = async (user, result) => {
  console.log("Sending analytics", user);
  await fetch("/analytics", { method: "POST", body: JSON.stringify({ user, result }) });
  console.log(`Sent with result ${result}`);
};

module.exports = {
  reportResult,
};