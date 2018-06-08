---
title: put init logic in the ngOnInit lifecycle hook
---
# Put init logic int he ngOnInit lifecycle hook

The `constructor` is a default method of the class that is executed when the class is instantiated. Here, the dependencies are injected. 
The `ngOnInit` hook will be called whenever Angular is ready prepping the component. This makes it the ideal place to put initialisation logic for your component.  
