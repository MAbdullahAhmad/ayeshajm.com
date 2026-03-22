## Case Study

### Overview

- **Client**: Ayesha Jan M. -- 3D Artist
- **Type**: Website, SPA
- **Stack**: ReactJS, CSR, 3D (ThreeJS / WebGL / TheatreJS), GSAP, Motion
- **Keywords**: 3D, Animations, Transitions, Portfolio

### Brief

My client, Ayesha is looking for a website developer who can maker her a website in order to display her 3D projects and arts on a portfolio website. It should:
- display her portfolio
- have smooth animations and transitions
- contain her 3D work. but in unique form.
- match the theme of a designer.

I’m collecting a skillset using which these tasks can be achieved, it should be a optimized website, that loads quickly and does not take too much processing on light devices. Also it should have smooth transitions, 3d artwork display with on-scroll and interactive animations.

### Challenges

It is a unique website concept. But it has some challenges as:
- **Optimization**: Adding 3d models to website make it heavy. I need to find a way so that models are reduced in size while keeping their form (mesh) and texture (surface of 3d objects).
- **Unique 3D Animations**: Simple 3D transition (rotate on scroll, slide, scale, etc) are simple to make. Creating unique animations (e.g., rotating a dial of watch while scrolling) is more complicated for development. It requires manually controlling those needles on scroll with programming.
- **Responsiveness**: For unique design concepts (e.g., a watch increasing scale, rotating and moving needles at same time along with some textual descriptions updating with it) requires a unique responsiveness strategy. So that it looks great on all pages.
- **Pages and Sections**: There are different items like portfolio, 3d objects, projects catalog, etc. in single website. They all need to be organized in a manner that it delivers the message of being a portfolio website along-with a display of work. So that it is balanced contents and easy to access / read on website.

### Concepts:

I’ve come up with a few concepts after requirements engineering and research.

#### Animating Watch:
An animating watch that is:

- displayed on a side in start.
- Scales-up and then down on scroll
- Rotates on scroll
- Rotates its needles on scroll.

As it is one of top work done by designer and it looks attractive in website.

#### Ocean of Projects:

Just like [deso.com](deso.com) displayed their token circulating around a few objects, we can display designer’s products (on product page). Similar concepts are used by some other developers as well.

#### Case-Study Footer:

Designer has worked on a recent project where a scene is built from various components. We can use it as her case study in order to display her work. It can be displayed as how different items were collected together in order to build a complete scene. This combines up as a footer of website. User can scroll in opposite direction to basically unfold those combination and scatter around items.
We have a few other similar alternatives as well.

### Strategy

My initial strategy includes:
- **TheatreJS + ThreeJS**: Such outcomes are better achievable with [TheatreJS](theatrejs.com) -- javascript animation library with a professional motion design tools.
- **Page-wise Projects**: Homepage and products catalog pages will have two threatreJS projects. Each having multiple scenes. For instance, homepage may include following scenes:
  - An initial watch sheet
  - A simpler version of Ocean-of-Projects sheet
  - Final footer sheet with items collecting
- **ThreeJS-only** components: There will be ThreeJS-only components as well. With simpler transitions and animations. For instance, a modal that displays product, etc.
- **CSR & Caching**: There will be an initial loader that waits for homepage to load. All other pages shall load with lazy-load technique. Each having its own loader and cache cleared with a short timeout.
- **Re-usable Assets**: Animations and scenes will collected as re-usable `state.json` assets, ThreeJS components, Motion / GSAP animation components. So that they are re-used in website. And saved for later use even if removed.
- **Documentation**: This project requires a bit more documented details about re-usable components.
- **NDA & License**: I always keep transparency and share useful options with my clients. We need an NDA for sensitive information and a proprietary license for public codebase.
