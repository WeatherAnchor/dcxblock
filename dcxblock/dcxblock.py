"""TO-DO: Write a description of what this XBlock is."""

import pkg_resources
from web_fragments.fragment import Fragment
from xblock.core import XBlock
from xblock.fields import Integer, Scope, String


class DcXBlock(XBlock):
    """
    TO-DO: document what your XBlock does.
    """
    has_score = True

    # Fields are defined on the class.  You can access them in your code as
    # self.<fieldname>.

    # TO-DO: delete count, and define your own fields.
    count = Integer(
        default=0, scope=Scope.user_state,
        help="A simple counter, to show something happening",
    )

    grade = 0

    dc_cdn = String(help="URL of the datacamp's cdn", default="http://cdn.datacamp.com/dcl/latest/dcl-react.js.gz", scope=Scope.content)

    dc_grade = Integer(help="Maximum grade for the assignment", default=1, scope=Scope.content)

    dc_code = String(help="Code for the exercise", default="<h1>This is code!</h1>", scope=Scope.content)

    def resource_string(self, path):
        """Handy helper for getting resources from our kit."""
        data = pkg_resources.resource_string(__name__, path)
        return data.decode("utf8")

    # TO-DO: change this view to display your data your own way.
    def student_view(self, context=None):
        """
        The primary view of the DcXBlock, shown to students
        when viewing courses.
        """
        html = self.resource_string("static/html/dcxblock.html")
        frag = Fragment(html.format(self=self))
        frag.add_css(self.resource_string("static/css/dcxblock.css"))
        frag.add_javascript(self.resource_string("static/js/src/dcxblock.js"))
        frag.initialize_js('DcXBlock')
        return frag

    def studio_view(self, context):
        """
        Create a fragment used to display the edit view in the Studio.
        """
        html = self.resource_string("static/html/mystudio.html")
        frag = Fragment(html.format(dc_cdn=self.dc_cdn, dc_grade=self.dc_grade, dc_code=self.dc_code))

        return frag

    # TO-DO: change this handler to perform your own actions.  You may need more
    # than one handler, or you may not need any handlers at all.
    @XBlock.json_handler
    def increment_count(self, data, suffix=''):
        """
        An example handler, which increments the data.
        """
        # Just to show data coming in...
        assert data['hello'] == 'world'

        self.count += 1

        event_data = {'value': 8, 'max_value': 16}
        self.runtime.publish(self, 'grade', event_data)

        return {"count": self.count}

    @XBlock.json_handler
    def submit_dc_grade(self, data, suffix=""):
        if data['correct'] == True:
            grade = 1
        else:
            grade = 2
        
        # event_data = {'value': grade, 'max_value': 20}
        # self.runtime.publish(self, 'grade', event_data)

        return {"grade":grade}

    @XBlock.json_handler
    def studio_submit(self, data, suffix=''):
        """
        Called when submitting the form in Studio.
        """
        self.dc_cdn = data.get('dc_cdn')
        self.dc_grade = data.get('dc_grade')
        self.dc_code = data.get('dc_code')


        return {'result': 'success'}

    # TO-DO: change this to create the scenarios you'd like to see in the
    # workbench while developing your XBlock.
    @staticmethod
    def workbench_scenarios():
        """A canned scenario for display in the workbench."""
        return [
            ("DcXBlock",
             """<dcxblock/>
             """),
            ("Multiple DcXBlock",
             """<vertical_demo>
                <dcxblock/>
                <dcxblock/>
                <dcxblock/>
                </vertical_demo>
             """),
        ]
