<script lang="ts">
  import Konva from "konva";

  // https://github.com/konvajs/svelte-konva

  import { onMount } from "svelte";
  import testImagePath from "assets/img/CHUWANAGA006_COVER-FRONT.png";
  let container: HTMLDivElement;
  let blurValue = 0;
  const minBlurValue = 0;
  const maxBlurValue = 25;
  let img: Konva.Image;
  let stage: Konva.Stage;

  $: {
    applyBlur(img, Konva.Filters.Blur, blurValue);
  }

  const applyBlur = (
    node: Konva.Node,
    filter: typeof Konva.Filters.Blur,
    amount: number
  ) => {
    if (node === undefined) return;
    node.cache();
    node.filters([filter]);
    node.blurRadius(amount);
    node.getLayer()?.batchDraw();
  };

  const handleDownload = (uri: string, name: string) => {
    const link = document.createElement("a");
    link.download = `${name}.png`;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportImage = () => {
    const name = "export";
    if (stage === undefined || img === undefined) return;

    // Obtenez le Transformer de la scène
    const tr = stage.find("Transformer")[0];

    // Cachez le Transformer
    tr.visible(false);

    // Redessinez la scène pour que le Transformer disparaisse
    stage.batchDraw();

    // Exportez la scène
    const uri = stage.toDataURL();
    handleDownload(uri, name);

    // Réaffichez le Transformer
    tr.visible(true);

    // Redessinez la scène pour que le Transformer réapparaisse
    stage.batchDraw();
  };

  onMount(() => {
    stage = new Konva.Stage({
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
      tr.nodes([img]);
      // add the layer to the stage
      stage.add(layer);

      stage.on("wheel", (e) => {
        e.evt.preventDefault();
        const oldScale = img.scaleX();

        const newScale = e.evt.deltaY > 0 ? oldScale * 0.97 : oldScale * 1.03;

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

<input
  type="range"
  min={minBlurValue}
  max={maxBlurValue}
  bind:value={blurValue}
/>

<button on:click={exportImage}>Download</button>

<style lang="scss">
  #container {
    margin: 2rem auto;
    border: 5px blue solid;
    width: 80%;
    height: 100%;
    aspect-ratio: 16 / 9;
    background-color: #eee;
  }

  input[type="range"] {
    width: 300px;
    height: 30px;
    background-color: #d7dcdf;
    border: none;
    -webkit-appearance: none;
    border-radius: 5px;
    outline: none;
    padding: 0;
    margin: 7px;
  }

  input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 17px;
    height: 33px;
    border: none;
    border-radius: 2px;
    background: #3498db;
    cursor: pointer;
    transition: background 0.15s ease-in-out;
  }
</style>
