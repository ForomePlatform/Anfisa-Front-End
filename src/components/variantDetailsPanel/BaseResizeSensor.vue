<template>
    <div>
        <slot/>
    </div>
</template>

<script>
import { ResizeSensor } from 'css-element-queries';

export default {
    mounted() {
        const gridItem = this.$parent;
        /* eslint-disable no-new */
        new ResizeSensor(this.$el, () => {
            const { clientHeight } = this.$el;
            const newHeight = Math.floor((clientHeight + gridItem.margin[1])
                / (gridItem.rowHeight + gridItem.margin[1]));
            if (newHeight) {
                gridItem.eventBus.$emit(
                    'resizeEvent',
                    'resizeend',
                    gridItem.i,
                    gridItem.x,
                    gridItem.y,
                    newHeight,
                    gridItem.w,
                );
            }
        });
    },
};
</script>
