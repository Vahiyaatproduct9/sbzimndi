export default ({ user_name, OTP, item_name, price }) => {
  return `This is a One Time Code for ${user_name}'s order ${item_name} of price ${price}/-.
    The code is: ${OTP}.
    Do NOT share your code unless when at the time of delivery.
    Thank you for using SbziMndi.`;
};
