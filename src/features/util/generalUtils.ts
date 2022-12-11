const welcomeMessages = [
    "Welcome back, %NAME%!", 
    "It's always a Good™ day to bank with The Good™ Bank, %NAME%!",
    "Feelin' Good™, %NAME%.",
    'Then %NAME% said, “Let there be savings!” and there were savings. And %NAME% saw that the savings and low interest rates were Good™.'
]

export const randomIntRange = (min: number, max: number) =>  Math.floor(Math.random() * (max - min) ) + min;

export const chooseWelcomeMessage = (name: string) => {
    const len = welcomeMessages.length;
    const index = randomIntRange(0, len);
    return welcomeMessages[index].replaceAll("%NAME%", name);
}

export const priceFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});