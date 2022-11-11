import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { MatButtonModule } from '@angular/material/button';
import { ButtonComponent } from 'projects/components/src/lib/button/button.component';

export default {
  title: 'Button',
  component: ButtonComponent,
  decorators: [
    moduleMetadata({
      imports: [MatButtonModule],
    }),
  ],
} as Meta;

const Template: Story = (args) => ({
  props: args,
});

export const Button = Template.bind({});

Button.args = {
  text: 'text',
  type: 'primary',
};
