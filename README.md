# Summary Topics

- Variables
- Nesting
- Modules
- Functions & Mixins (placeholder functions)
- Inheritance
- Operators
- Conditionals

### Important Update

`@import` is depreicated because as you may have seen in the above tutorial that when you include `@import 'config'` you have access to all the variables. But let say you had multiple files containing variables in them, and you import it in main `style.scss`, then you don't know which variables are available to which file (as it depends on the order of importing), and also it may happen that there are two variables of the same name in two different files. So it caused a lot of ambiguity. We could not debug which variable is affecting which file.

**That's why now we use a more mordern syntax `@use` for importing modules.**

Now the variables are namespaced and are scoped to the file importing other files. From the below example you can see to use a variable, we need to use the filename with a dot and then the name of the variable inside that file that you want to access.

```
Project Folder/
├── index.html
├── dist/
└── scss/
    ├── configs/
    │   ├── _colors.scss
    │   └── _fonts.scss
    ├── components/
    │   ├── _cards.scss
    │   └── _buttons.scss
    └── style.scss
```


```scss
// style.css
@use 'configs/fonts';
@use 'configs/colors';

body {
	font-size: fonts.$font-size;
	color: colors.$primary-color;
}
```

So now even you try to use the variables in these config files, you won't be able to use it.

```scss
//style.scss
@use 'configs/fonts';
@use 'configs/colors';

@use 'components/cards';

body {
	font-size: fonts.$font-size;
	color: colors.$primary-color;
}
```

In the above example if we used `@import` everywhere instead of `@use`, it would have perfectly worked, since `cards` components would have access to the config variables.

But now if you want to use those variables, you will have to import those set of files in `cards.scss` and access the variables like above.

But again you may think that since I have a lot of components, then I will have to repeatedly import these config files in each of my component files. Thus, in such cases, we use `@forward` directive. You can create a `index.scss` in `scss/configs/` folder and that index file will broadcast all the variables to whosoever imports it.

```scss
// scss/configs/index.scss

@forward 'fonts';
@forward 'colors';
```

```scss
// scss/components/cards.scss

@use '../configs';

.card {
	// variables will be namespaced to filename right!
	font-size: configs.$font-size;
	color: configs.$primary-color;
}
```

**Important Tip**

If you want to remove or shorten the namespace, you can do it as shown below:

```scss
@use '../configs' as c;
@use '../configs' as *;
```


