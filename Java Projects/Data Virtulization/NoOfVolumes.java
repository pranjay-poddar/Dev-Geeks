/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import java.io.IOException;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;
import org.knowm.xchart.CategoryChart;
import org.knowm.xchart.CategoryChartBuilder;
import org.knowm.xchart.XChartPanel;
import org.knowm.xchart.demo.charts.ExampleChart;
import org.knowm.xchart.style.Styler;
import org.knowm.xchart.style.Styler.ChartTheme;
import static org.knowm.xchart.style.Styler.LegendPosition.OutsideS;

  public class NoOfVolumes implements ExampleChart<CategoryChart> {
  public XChartPanel getPanel() throws IOException {
    ExampleChart<CategoryChart> exampleChart = new NoOfVolumes();
    CategoryChart chart = exampleChart.getChart();
    XChartPanel panel=new XChartPanel(chart);
    return panel;
  }
  @Override
  public CategoryChart getChart() {
    // Create Chart
    Connection con = DbConnect.getConnection();
    CategoryChart chart = new CategoryChartBuilder().width(1366).height(748)
            .title("BRANCH WISE DISTRIBUTION")
            .xAxisTitle("BRANCH")
            .yAxisTitle("DISTRIBUTION")
            .theme(ChartTheme.Matlab).build();
    // Customize Chart
    chart.getStyler().setPlotGridLinesVisible(false);
    chart.getStyler().setLegendPosition(OutsideS);
    chart.getStyler().setToolTipsEnabled(true);
    chart.getStyler().setToolTipType(Styler.ToolTipType.yLabels);
    // Series
    List<String> xData = new ArrayList<>();
    List<Integer> yData = new ArrayList<>();
    try {
                Statement statement = con.createStatement();
                ResultSet resultSet = statement.executeQuery("SELECT * FROM noofvolumes");
                int i = 0;
                while (resultSet.next()) 
                {
                    xData.add(i,resultSet.getString("BRANCH"));
                    yData.add(i,Integer.parseInt(resultSet.getString("VOLUMES")));
                    i++;
                }
            } 
    catch (NumberFormatException | SQLException e) 
    {
                System.out.println(e);
    }
    chart.addSeries("NUMBER OF VOLUMES",xData,yData);
    List<String> xData1 = new ArrayList<>();
    List<Integer> yData1 = new ArrayList<>();
    try {
                Statement statement = con.createStatement();
                ResultSet resultSet = statement.executeQuery("SELECT * FROM noofvolumes");
                int i = 0;
                while (resultSet.next()) 
                {
                    xData1.add(i,resultSet.getString("BRANCH"));
                    yData1.add(i,Integer.parseInt(resultSet.getString("TITLES")));
                    i++;
                }
            } 
    catch (NumberFormatException | SQLException e) 
    {
                System.out.println(e);
    }
    chart.addSeries("NUMBER OF TITLES",xData1,yData1);
    return chart;
  }
}