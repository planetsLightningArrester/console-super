# super-console
Add time stamp, color and replace previous line. It all using only console! Make console great again!

### Install
`npm i console-super`

### Usage
```Javascript
require('console-super');

console.timeTag("OMG ITS A TIME STAMP");
console.showMs(true);
print.timeTag("AND WITH MS!");
print.timeTag("I CAN EVEN OVERWRITE THIS (IN 4 SECS)");
setTimeout(function(){
    print.inlineTimeStamp("NO WAY! ITS AWESOME!")
}, 4000)
```

### Parameters
+ **data:** Data to be shown (`string`, `array`, `object`, `number`)
+ **base (default is 10):** If `data` is a `number` type, then `base` defines in witch base the number must be show, e.g. binary (2), decimal (10), hexdecimal (16), etc.
+ **{mod1: 'red', mod2: 'bright', mod3: 'bgWhite'}:** You can modify the terminal characteristics, like color, its background color and brightness! See at the and all the possibilities.

### Methods
+ ***console.timeTag(data[,base,{mod1, mod2, mod3}]):***
    + console.timeTag("Hi!") ->                         [22:00:19] Hi!
    + console.timeTag({"me":"ur age?", "you":20}) ->    [22:00:22] {"me":"ur age?", "you":20}
    + console.timeTag(90) ->                            [22:00:24] 90
    + console.timeTag(90, 16) ->                        [22:00:26] 5A
    + console.timeTag(13, 2, {mod1: 'cyan'}) ->         <span style="color:blue">[22:00:28] 1101</span>.
+ ***print.inlineTimeTag(data[,base,{mod1, mod2, mod3}]): Overwrites the previous line***
    + console.inlineTimeStamp("Loading...") -> ~~[13:00:00] Loading...~~ [13:00:03] Complete!
    + console.inlineTimeStamp("Complete!") ------------------------------^
+ ***print.timeStamp_ms(data[,base]):***
    + print.timeStamp_ms("I'd like to be more precise!") ->  [10:20:09.023] I'd like to be more precise!
+ ***print.inlineTimeStamp_ms(data[,base]): Overwrites the previous line***
    + print.inlineTimeStamp_ms("Precise overwriting!") -> [11:30:49.001] Precise overwriting!