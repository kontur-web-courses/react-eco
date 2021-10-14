.PHONY: watch, update

index.html: slides.md styles.css
	npx cleaver@latest slides.md

slides: index.html

watch:
	npx cleaver@latest watch slides.md

update:
	npx npm-check@latest tasks -u
