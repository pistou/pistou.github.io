---
layout: post
category: developpement
title: Comment faire un blog statique avec Jekyll
date: 2017-02-28 17:23
author: P. Skowron
toc: true
thumbnail: jekyll_github.png
---


> Apprendre à faire son propre blog, simplement et rapidement, à l'aide de Jekyll et GitHub Pages.

# Sommaire
{: .no_toc}
* Toc
{: toc}
---

# De quoi s'agit-il ?
### Jekyll
[Jekyll](http://jekyllrb.com) est un générateur de sites statiques. Développé en Ruby par [Tom Preston Werner](https://en.wikipedia.org/wiki/Tom_Preston-Werner), co-fondateur de [GitHub](https://github.com), ce moteur est aujourd'hui utilisé par [GitHub Pages](pages.github.com) pour générer vos pages.

Le concept est très simple : il suffit de mettre en place quelques templates HTML (grâce à [Liquid](https://shopify.github.io/liquid/)). Il ne vous reste alors plus qu'à rédiger vos articles en [Markdown](https://fr.wikipedia.org/wiki/Markdown) et laisser la magie opérer :dizzy:

Ce système est tellement simple que c'est celui que j'ai choisi pour héberger ce blog !


### GitHub Pages
[GitHub Pages](https://pages.github.com) est le service **gratuit** de GitHub permettant d'héberger un site directement depuis vos dépôts. GitHub Pages est fait pour fonctionner avec Jekyll. Le système s'occupera donc de générer lui-même votre site à partir de votre projet.

Un simple `commit` et le tour est joué !




# Configuration et mise en route
La simplicité étant au coeur de Jekyll, la prise en main est donc assez aisée. Néanmoins, il existe très peu de documentation en français.

Pour mettre en ligne son blog, les étapes à suivre sont les suivantes :
1. Installer Jekyll
2. Créer un projet
3. Configurer son site et ses templates
4. Créer un article
5. Lancer son blog en local pour s'assurer du rendu
6. Déployer le tout en ligne

## Installer Jekyll

Pour rappel, Jekyll est développé en Ruby. Il vous faudra donc [Ruby](https://www.ruby-lang.org/fr/downloads/) et [RubyGem](https://rubygems.org/pages/download) installés sur votre machine.

> *Note : Pour les utilisateurs de Windows, il est préférable d'utiliser [RubyInstaller](http://rubyinstaller.org/) pour mettre en place votre environnement.*
{: .note}

L'installation se fait avec une simple ligne de commande dans la console :

{% highlight shell %}
~ $ gem install jekyll bundler
{% endhighlight %}

Il vous faudra aussi [un compte sur GitHub](https://github.com/join) et y créer un dépôt sous la forme `USERNAME.github.io` **en remplaçant `USERNAME` par votre propre nom d'utilisateur**. Pour cela vous pouvez utiliser [l'interface en ligne](https://github.com/new).


## Créer un projet

Pour simplifier le processus, j'ai créé [un projet](https://github.com/pistou/jekyll-boilerplate) qu'il vous suffira de cloner. Vous aurez alors tous les éléments de départ pour faire votre propre blog.

{% highlight shell %}
~ $ git clone https://github.com/pistou/jekyll-boilerplate USERNAME.github.io
{% endhighlight %}

> *Note : Jekyll offre la possibilité de créer un projet à partir de rien*
>
>     ~ $ jekyll new USERNAME.github.io
{: .note}

Pensez à rattacher votre projet à votre dépôt et faire un premier commit :

{% highlight shell %}
~ $ cd USERNAME.github.io
~ $ git remote set-url origin git@github.com:USERNAME/USERNAME.github.io.git
{% endhighlight %}


## Configurer son site et ses templates

### Configuration
Le fichier de configuration principal se trouve à la racine du dossier : `_config.yml`. Il vous suffira d'ouvrir ce fichier avec votre éditeur favoris et de remplir les champs à votre convenance.

#### Paramètres du site
Tous les variables configurées dans la partie *Site settings* seront accessibles via `site.VARIABLE`. **Vous pouvez en ajouter autant que vous le souhaitez.**

#### Paramètres Jekyll
Ces variables permettent de configurer Jekyll pour la génération de votre site. Vous trouverez plus d'informations dans [la documentation de Jekyll](https://jekyllrb.com/docs/configuration/).

#### Gemfile
Le fichier `Gemfile` à la racine du dossier est utile à GitHub Pages afin que celui-ci sache quelles sont les Gems utilisées pour générer le site.

### Templates et pages
Jekyll se base sur des fichiers HTML, complétés par le langage de template [Liquid](https://shopify.github.io/liquid/).

> *Note : cet article ne traite pas l'apprentissage de Liquid. Je vous invite donc à lire la documentation et les exemples qui y sont fournis.*
{: .note}

#### YAML Front Matter
Jekyll se sert de [YAML](https://fr.wikipedia.org/wiki/YAML) en en-tête pour toutes les variables au sein d'une page. Ce concept est très important, permettant de passer des variables lors de la génération automatique de votre site.

Pour cela, il suffit de mettre en début de fichier des variables entourées de trois tirets `---`.
Dans les pages de votre site, ces variables seront accessibles via `page.variable`.

#### Templates
Par défaut, les templates sont stockés dans le dossier `_layouts`.

##### default.html
Par convention, on crée un template `default.html` qui sera le modèle de base de toutes nos pages (pages de contenu, articles, etc.). Il va donc contenir la structure HTML.

Le mot-clé important ici est `content`. C'est ici que sera placé tout le contenu de vos pages.

> *Note : La balise Liquid `include` sert à inclure, à l'endroit choisi, un fichier HTML se trouvant dans le dossier `_includes`.*
{: .note}

##### post.html
En général, un second layout `post.html` est créé pour les articles.

Il est nécessaire de préciser dans le *Front Matter* que ce template est basé sur le modèle `default.html`.
> *Note : Lorsqu'on précise un layout, seul le nom du template est nécessaire : on ne précise pas l'extension.*
>
> *Malgré le fait qu'il s'agisse d'un **post**, c'est bien le mot-clé `page` qui est utilisé par Liquid pour récupérer les variables de nos articles.*
{: .note}



#### Pages
Les pages de contenus doivent se trouver à la racine de votre projet.

Dans notre exemple, nous n'avons que la page d'accueil `index.html`. Cette page sert de liste des articles publiés sur notre blog.
Puisqu'on ne souhaite pas de mise en page particulière, on utilise le template `default`.

Jekyll met à notre disposition plusieurs variables. La plus importante est `site.posts` : il s'agit de la liste des articles, triée par ordre chronologique inversé. Cette variable pourra nous servir, à l'aide de la boucle `for`, à lister tous les articles de notre site.

Vous trouverez toutes les variables disponibles sur [la documentation de Jekyll](https://jekyllrb.com/docs/variables/)

## Créer un article
Les articles se trouvent dans le dossier `_posts`. Ils doivent être enregistrés en **Markdown** (*\*.md*) et sous la forme `ANNEE-MOIS-JOUR-titre-sans-caractères-speciaux`.

> *Note : Des sites tels que [Slugify.net](http://slugify.net/) peuvent vous aider à créer le nom de vos articles à partir de leur titre.*
{: .note}

Comme pour les pages, il est nécessaire de préciser dans le **Front Matter** le *layout* utilisé pour l'article, ainsi que les variables que vous voudrez rendre disponibles.


{% highlight yml %}
---
layout: "post"
title: "My first article"
date: "2017-02-28"
author: "John Doe"
---
{% endhighlight %}

Cette configuration permet donc d'accéder à `page.title` pour récupérer le titre de l'article par exemple.


## Lancer son blog en local
Il est très simple de générer son site en local. Pour cela, on retourne dans la console :

{% highlight shell %}
~ $ bundle exec jekyll serve
{% endhighlight %}

Il vous suffit ensuite de vous rendre à l'adresse [http://localhost:4000](http://localhost:4000) pour visualiser votre site.

Cette commande permet d'installer les éventuelles Gem dont Jekyll aura besoin ainsi que de générer localement, dans le dossier `_site`, les pages statiques de votre site.

## Déployer en ligne
Comme expliqué au début, GitHub Pages s'occupe de tout ! Il suffit de `commit`.

{% highlight shell %}
~ $ git add .
~ $ git commit -m "Initial commit"
~ $ git push origin master
{% endhighlight %}

Ensuite, en laissant quelques minutes à GitHub Pages pour générer le site, il vous suffira d'aller à l'adresse [https://USERNAME.github.io](https://USERNAME.github.io) pour retrouver votre site en ligne.

Et voilà ! Votre site est en ligne et vous pouvez donner l'adresse à tous vos amis !

Pour rajouter des articles, il vous suffira de créer 


# Pour aller plus loin

## Ressources
La [documentation officielle de Jekyll](https://jekyllrb.com/docs/home/) est vraiment très complète. Je ne peux que vous conseiller d'y faire un tour.

Si vous avez des problèmes, il est possible que d'autres les aient eu avant ! N'hésitez pas à chercher sur [Stack Overflow](http://stackoverflow.com/questions/tagged/jekyll)!

De nombreux sites proposent des templates pour Jekyll, qu'ils soient gratuits ou payants (liste non-exhaustive) :
- [https://jekyllthemes.io/](https://jekyllthemes.io/)
- [http://jekyllthemes.org/](http://jekyllthemes.org/)
- [http://jekyll.tips/templates/](http://jekyll.tips/templates/)
- [http://themes.jekyllrc.org/](http://themes.jekyllrc.org/)
- ...


Pour toute question, je serais ravis de vous répondre via [Twitter](https://twitter.com/pistoudev) :bird:

## Fonctionnalités
L'exemple fournis est vraiment basique, on peut y ajouter de nombreuses fonctionnalités plus ou moins complexes :
- Créer de nouvelles pages de contenus (à propos, contact, etc.)
- Ajouter une barre de navigation
- Ajouter une pagination sur la liste des articles
- ... laissez libre court à votre imagination !
