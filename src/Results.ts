import { PointedResult, Result } from "./Questions";

export type Results = { [result in Result]: number };

export function getDescription(result: string): string {
    switch(result) {
        case Result.Java:
            return `You like to code a lot of boilerplate code because you think object oriented programming reigns supreme. The word verbose? You live by it. Atleast you don't code in python because then you would be a threat to society, not because of your skill, but because this world is already infested with enough mentally ill and you sharing your python ideas would only cause more.`;
        case Result.Swift:
            return `So you pretty much want to kill yourself, that's what swift does to you... It's not too late to stop coding in it, it's not even that hard like it's not addicting like drugs or something it's just a language. So please, for your own health, stop coding in swift.`
        case Result.Cpp:
            return `Honestly, you're a bit of a genius. I mean unless you are like really really, you're not getting C++. Memory is your best friend. But it comes at a cost, you probably stay up late at night and have a terrible sleep schedule because you're busy trying to figure out why you are getting 50 segmentation faults.`;
        case Result.Kotlin:
            return `So you liked coding in Java but also hated it. Then you met Kotlin and fell in love. You like everything to be simple and concise for you, if you were an English teacher, most people would probably fail your class. Also, you might start balding early because figuring out these errors will make you stress.`;
        case Result.Javascript:
            return `Be honest, when you code in Javascript you don't know how any of the code you write actually works, it just works. You probably like other people to do things for you and you also use the same tool for everything. You just take a wrench and throw it at things and expect it to work.`;
        case Result.Go:
            return `Gophers are your best friend. You like to run around and do a bunch of things at once like the multitasker you are. I mean in one hour, you probably get all your chores done that takes people weeks to do. Good job!`;
        case Result.Python:
            return `Come on, code in something different. Just because it CAN do it doesn't mean you should. Why are you trying to write a AI that will take over the world in python, please, get some help... programming language counseling exists, well, atleast you're not swift.`;
        } 

    return "";
}