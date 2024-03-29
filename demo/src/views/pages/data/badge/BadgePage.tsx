import {Code, ExampleTable, ImportPreview, TypeLine} from '@shared/components';
import {Page} from '@shared/components/page';
import {ArrMerge} from '@shared/utils/ArrMerge';
import {Badge} from '@ui/data-display';
import {Divider, Row} from '@ui/layout';
import {DaisyColor, DaisyColors, DaisySizes} from '@ui/types';

export const BadgePage = () => {
  const colors = ArrMerge<DaisyColor, 'ghost'>([...DaisyColors], ['ghost']);
  const sizes = [...DaisySizes];

  return (
    <Page full class="p-4">
      <br />

      <Page.Section name="import">
        <ImportPreview component="Badge" />
      </Page.Section>

      <Page.Section name="view examples">
        <h2 class="text-2xl">View examples</h2>
        <br />
        <ExampleTable
          colors={colors}
          sizes={sizes}
          component={(color, size) => (
            <Badge color={color} size={size}>
              Badge
            </Badge>
          )}
        />
      </Page.Section>

      <Page.Section name="colors">
        <h2 class="text-2xl">Colors</h2>
        <p>
          Use <strong class="text-info">color</strong> prop to change color of
          the Badge. You can set the value to: <br />
          <TypeLine types={colors} />
        </p>
        <Row class="gap-2 py-4">
          <Badge color="primary">primary</Badge>
          <Badge color="secondary">secondary</Badge>
          <Badge color="accent">accent</Badge>
          <Badge color="info">info</Badge>
          <Badge color="success">success</Badge>
          <Badge color="warning">warning</Badge>
          <Badge color="error">error</Badge>
          <Badge color="ghost">ghost</Badge>
        </Row>

        <Code>{`
          <Row class="gap-2 py-4">
            <Badge color="primary">primary</Badge>
            <Badge color="secondary">secondary</Badge>
            <Badge color="accent">accent</Badge>
            <Badge color="info">info</Badge>
            <Badge color="success">success</Badge>
            <Badge color="warning">warning</Badge>
            <Badge color="error">error</Badge>
            <Badge color="ghost">ghost</Badge>
          </Row>
        `}</Code>
      </Page.Section>

      <Page.Section name="sizes">
        <h2 class="text-2xl">Sizes</h2>
        <p>
          Use the <strong class="text-info">size</strong> prop to change the
          size of the Badge. You can set the value to: <br />
          <TypeLine types={sizes} />
        </p>

        <Row items="center" class="gap-2 py-4">
          <Badge size="lg">lg</Badge>
          <Badge size="md">md</Badge>
          <Badge size="sm">sm</Badge>
          <Badge size="xs">xs</Badge>
        </Row>

        <Code>{`
          <Row items="center" class="gap-2 py-4">
            <Badge size="lg">lg</Badge>
            <Badge size="md">md</Badge>
            <Badge size="sm">sm</Badge>
            <Badge size="xs">xs</Badge>
          </Row>
        `}</Code>
      </Page.Section>

      <Page.Section name="outline">
        <h2 class="text-2xl">Outline</h2>
        <p>
          Use the <strong class="text-info">outline</strong> prop to change the
          outline style of the Badge.
        </p>

        <Row class="gap-2 py-4">
          <Badge color="primary" outline>
            primary
          </Badge>
          <Badge color="secondary" outline>
            secondary
          </Badge>
          <Badge color="accent" outline>
            accent
          </Badge>
          <Badge color="info" outline>
            info
          </Badge>
          <Badge color="success" outline>
            success
          </Badge>
          <Badge color="warning" outline>
            warning
          </Badge>
          <Badge color="error" outline>
            error
          </Badge>
          <Badge color="ghost" outline>
            ghost
          </Badge>
        </Row>

        <Code>{`
          <Row class="gap-2 py-4">
            <Badge color="primary" outline>primary</Badge>
            <Badge color="secondary" outline>secondary</Badge>
            <Badge color="accent" outline>accent</Badge>
            <Badge color="info" outline>info</Badge>
            <Badge color="success" outline>success</Badge>
            <Badge color="warning" outline>warning</Badge>
            <Badge color="error" outline>error</Badge>
            <Badge color="ghost" outline>ghost</Badge>
          </Row>
        `}</Code>
      </Page.Section>
    </Page>
  );
};
