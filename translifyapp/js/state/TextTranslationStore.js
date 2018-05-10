import {Ajax} from "Ajax";
import {StoreObject, GenericObjectStore} from "Store";
import {GlobalState} from "State";

export class TextTranslation extends StoreObject {
    constructor(...args) {
        super(...args);
        // TODO: Get rid of this once we have database working.
        this.initMock();
    }

    initMock() {
        this.title = ["Course 1", "Introduction to vrajeala", "How to rock like a roll", "X - a professional or beginner mistake?"]
            [Math.floor(Math.random() * 4)];
        this.photoUrl = [
            "http://www.aktual24.ro/wp-content/uploads/2016/10/document.jpg",
            "https://sites.fas.harvard.edu/~hpcws/august28,1980.JPG",
            "https://upload.wikimedia.org/wikipedia/commons/7/76/1853_Subscription_document.JPG",
            "http://www.elonka.com/kryptos/sanborn/KGBCyrillic.jpg"
        ][parseInt(Math.random() * 4)];
        this.content = ["Stupid user or stupid UI?\n" +
        "That time I lost ~£400 because I didn’t scroll down\n" +
        "\n" +
        "I remember reading this story about Hulu stealing $6 from Lauren LoPrete with a “sneaky UX trick”:\n" +
        "Ask me how Hulu stole $6.00 from me with this one sneaky UX trick.\n" +
        "\n" +
        "Yep, that’s me. You’re probably wondering how I got here in the first place. Back in 2015, Cinnamon Toast Crunch had a…\n" +
        "blog.prototypr.io\t\n" +
        "To summarise, Lauren never pressed ‘save’ after toggling an option to switch pricing plans. That was because the confirmation button to save her changes was all the way at the bottom of the page — you’d somehow have to know to scroll all the way to the bottom, and click ‘continue’, then follow a process to confirm.\n" +
        "A similar thing happened to me, and I incurred a ~£400 bill. Maybe it’s partly down to my own stupidity, but have a read and make up your mind. Long story short, I feel like the UI provided important payment information in the wrong place at the wrong time, almost hiding it from me through the use of cleverly placed call-to-actions.\n" +
        "First, here is an overview of the problem:\n" +
        "Overview: App Stopped != Zero Cost\n" +
        "I was using Redhat’s web hosting service to run a website, and upgraded to their bronze pricing plan to make use of extra pay-as-you-use resources. After I no longer needed their service, I hit ‘Stop App’, thinking I’d shut it down.\n" +
        "In my mind, a stopped status suggests that the service is no longer in use (so I won’t be billed). I was using an older version of their service, but it looked something like this when ‘Stopped’:\n" +
        "\n" +
        "Therefore, I forgot all about it and got billed around £400 for the entire time the app was stopped. Maybe I didn’t read everything carefully, but I felt a bit tricked.\n" +
        "After contacting Customer Support, I was told the information on pricing was clear:\n" +
        "\n" +
        "…I just never saw it, because it was provided right at the bottom of the sign up page — no where near the focus of the user. See below — the call to action for upgrading an account is shown far above the billing information, so many users are bound to miss it. There’s also 5 call-to-action buttons before the information (highlighted by the blue numbers):",
        "The Subtle Art of Connecting With Anyone\n" +
        "The late George Carlin is probably one of my favorite comedians.\n" +
        "I always found him to be raw and honest, and like most great comedians, there was a sense that he wasn’t there to just make you laugh. He had a subtle truth to share and that truth was best delivered as a joke.\n" +
        "In this way, towards the later years of his career, he said something in an interview with Jon Stewart that resonated with me quite a bit.\n" +
        "“I love, love individuals. I hate groups of people.”\n" +
        "Of course, we can all apply our own nuanced lens to that statement and pick out exceptions here and there, but to me at least, there is some sense there.\n" +
        "Many groups of people do great things. Many groups of people do bad things. In either case, what they have in common is that they are ideologues. And realistically speaking, if they weren’t, they likely wouldn’t accomplish much.\n" +
        "Still, there is something there that rubs me the wrong way. Maybe it’s their pure conviction that they’re right, or maybe it’s just their way of operating.\n" +
        "That’s why the first part of that statement, about loving individuals, is interesting. Because I do. And I’m consistently reminded of that fact every time I get out of my regular routine and meet a swarm of new people.\n" +
        "In fact, the more I do that, the more convinced I get that there likely isn’t anyone out there I wouldn’t be able to see some commonality with if I sat down with them privately for, say, an hour or two.\n" +
        "That’s fascinating to me, and it makes me wonder what it really is about individual relationships that makes them succeed.\n" +
        "How and why does a personal connection with someone work?\n" +
        "The Value of a Shared Culture\n" +
        "A while ago, someone asked me how I would describe what it’s like to bond with someone. I remember thinking about it for a moment before saying,\n" +
        "“It’s like sharing an invisible stream of consciousness with each other.”\n" +
        "I’m not entirely sure I knew what that meant then, but I think I do now.\n" +
        "One of the reasons that groups of people are able to bond together is because of the shared culture that they have created. This culture is essentially an invisible presence that contains knowledge about what a particular group values, how they conduct themselves, and where they want to go.\n" +
        "Movements have a culture. Companies have a culture. Families have a culture.\n" +
        "It’s the glue that binds us together. It’s what adds context to our discussions, it’s what inspires us when no one is looking, and it’s what moves us to action.",
        "A list for those in search of free tools to add to the toolkit.\n" +
        "\n" +
        "“A busy desk with a keyboard, a notebook, a cable, pencils and glasses near an iMac” by Sabri Tuzcu on Unsplash\n" +
        "As a typical broke college student, I am a huge fan of free things which is probably why I have always found software so fascinating. You can literally make anything for the cost of nothing when it comes to software thanks to open source. One of the reasons I became a programmer was because there was no entry fee. The only things I needed were time, dedication, and a whole lot of patience. Despite being free, these tools are things I used constantly because of their undeniable quality.\n" +
        "Atom\n" +
        "\n" +
        "Logo for the Atom Text Editor\n" +
        "Atom is one of my go-to applications and is becoming more and more useful everyday. Not only is Atom a 100% hackable text editor, it’s also a unique IDE. With it being open sourced, people have created thousands of packages to help maximize workflow and create a better working environment. Working in python? No problem, just install autocomplete-python and let it finish your sentences. Find yourself using HTML, CSS, or JavaScript? There’s a package for that. There’s a package for anything, and if there isn’t, then you can make your own. Also, Atom just looks delightful and feels great to write in.\n" +
        "Although it can be extremely slow to start on Windows, the launch time is not even an issue on Linux systems. I have used Atom to use all of the above languages and Ruby and it has been a charm to use for all of them.\n" +
        "Overall Rating: 9/10\n" +
        "IntelliJ IDEA/PyCharm\n" +
        "When I’m feeling something more fully-featured than a text editor and decide to use an IDE, my favorites by far are IntelliJ IDEA and PyCharm (both developed by JetBrains). While people will argue that vim/emacs are far superior, I began with using fully featured IDEs like Eclipse, so I find comfort in having all of the features at my disposal. IntelliJ revolves around Java while PyCharm is, as you guessed it, all about Python. (JetBrains also develops Android Studio which is essentially IntelliJ but with Android development front-and-center.\n" +
        "On the downside, an IDE is almost always going to be less lightweight than something as simple as a text editor, but these IDEs have always been more than enough for my needs. I have, however, found them to be far faster than Eclipse and much easier to get along with. Eclipse, while a great tool, can be quite awkward to work with and I find that JetBrains’ IDEs are much nicer to look at as well.\n" +
        "Overall Rating: 9/10\n" +
        "OneNote/Simplenote\n" +
        "\n" +
        "“A fountain pen on a spiral notebook” by Aaron Burden on Unsplash\n" +
        "Note taking is something that I think everyone can benefit from, but if you’re anything like me then you suffer from crazy high levels of choice paralysis. It’s sometimes hard to find a good replacement for pen and paper, but for those who prefer to have everything digitally saved, I’ve found that OneNote and Simplenote are the best options for note taking."]
        [parseInt(Math.random() * 3)];
    }

    getTitle() {
        return this.title;
    }

    getPhotoUrl() {
        return this.photoUrl;
    }

    getContent() {
        return this.content;
    }
}

export const TextTranslationStore = new GenericObjectStore("translation", TextTranslation);
