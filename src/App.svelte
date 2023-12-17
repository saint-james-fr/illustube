<script lang="ts">
  import Konva from "konva";

  import { onMount } from "svelte";
  import testImagePath from "assets/img/CHUWANAGA006_COVER-FRONT.png";
  let container: HTMLDivElement;
  let blurValue: number;
  const minBlurValue = 0;
  const maxBlurValue = 30;
  let img: Konva.Image;

  $: {
    console.log("blurValue", blurValue);
    // applyBlur(img, Konva.Filters.Blur);
  }

  const applyBlur = (node: Konva.Node, filter: typeof Konva.Filters.Blur) => {
    node.filters([filter]);
    node.blurRadius(blurValue);
    node.getLayer()?.batchDraw();
  };

  onMount(() => {
    const stage = new Konva.Stage({
      container: container,
      width: container.clientWidth,
      height: container.clientHeight,
    });

    const testImage = new Image();
    testImage.src = testImagePath;
    testImage.onload = () => {
      const aspectRatio = testImage.width / testImage.height;

      img = new Konva.Image({
        x: 0,
        y: (stage.height() / 2) * -1,
        image: testImage,
        width: stage.width(),
        height: stage.width() / aspectRatio,
        draggable: true,
      });

      // then create layer
      const layer = new Konva.Layer();

      // add the shape to the layer
      layer.add(img);

      const tr = new Konva.Transformer();
      layer.add(tr);
      tr.attachTo(img);
      // add the layer to the stage
      stage.add(layer);

      stage.on("wheel", (e) => {
        e.evt.preventDefault();
        const oldScale = img.scaleX();

        const newScale = e.evt.deltaY > 0 ? oldScale * 0.95 : oldScale * 1.05;

        const oldPos = {
          x: img.x(),
          y: img.y(),
        };

        img.scaleX(newScale);
        img.scaleY(newScale);

        // Ajuster la position de l'image pour maintenir le centre
        const newPos = {
          x: oldPos.x - (img.width() * (newScale - oldScale)) / 2,
          y: oldPos.y - (img.height() * (newScale - oldScale)) / 2,
        };

        img.position(newPos);

        layer.batchDraw();
      });

      // draw the image
      layer.draw();
    };
  });
</script>

<div bind:this={container} id="container"></div>

<input type="range" min={minBlurValue} max={maxBlurValue} bind:value={blurValue} />

<style lang="scss">
  #container {
    margin: 2rem auto;
    border: 5px blue solid;
    width: 80%;
    height: 100%;
    aspect-ratio: 16 / 9;
    background-color: #eee;
  }
</style>
